package main

import (
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var (
	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}

	clients = make(map[*websocket.Conn]bool)
	mutex   = sync.Mutex{}
)

func main() {
	// Serve static files from the "public" directory
	fs := http.FileServer(http.Dir("public"))
	http.Handle("/", fs)
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		handleWebSocket(w, r)
	})

	// Listen on port 8080
	log.Println("Listening on :8080...")
	err := http.ListenAndServe(":228", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	mutex.Lock()
	clients[conn] = true
	mutex.Unlock()

	log.Println("WebSocket connection initialized.")

	// Read and write WebSocket messages
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			mutex.Lock()
			delete(clients, conn)
			mutex.Unlock()
			return
		}
		log.Printf("Received message: %s\n", p)

		// Broadcast the message to all connected clients
		mutex.Lock()
		for client := range clients {
			err = client.WriteMessage(messageType, p)
			if err != nil {
				log.Println(err)
				client.Close()
				delete(clients, client)
			}
		}
		mutex.Unlock()
	}
}
