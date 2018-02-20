package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func main() {
	indexFile, err := os.Open("html/index.html")
	if err != nil {
		fmt.Println(err)
	}
	index, err := ioutil.ReadAll(indexFile)
	if err != nil {
		fmt.Println(err)
	}
	http.HandleFunc("/websocket", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			fmt.Println(err)
			return
		}
		dataIndex := 0
		for {
			msgType, _, err := conn.ReadMessage()
			if err != nil {
				fmt.Println(err)
				return
			}
			time.Sleep(10 * time.Millisecond)
			s1 := rand.NewSource(time.Now().UnixNano())
			r1 := rand.New(s1)
			myNumber := r1.Intn(100)

			var dataRes [2]int
			dataRes[0] = dataIndex
			dataRes[1] = myNumber

			byteArr, _ := json.Marshal(dataRes)
			fmt.Println(byteArr)

			err = conn.WriteMessage(msgType, []byte(byteArr))
			if err != nil {
				fmt.Println(err)
				return
			}
			dataIndex += 1
		}
	})
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, string(index))
	})
	http.ListenAndServe(":3000", nil)
}
