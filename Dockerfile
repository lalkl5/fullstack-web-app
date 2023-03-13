# Use the official Golang image as a parent image
FROM golang:1.20.2-alpine3.17

# Set the current working directory inside the container
WORKDIR /app

# Copy the Go modules and the source code
COPY go.mod go.sum main.go ./

# Install dependencies
RUN go mod download && go build -o main .

# Expose the port on which the application will listen
EXPOSE 80

# Run the binary
CMD ["./main"]
