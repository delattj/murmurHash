package main

import (
	"os"
	"fmt"
	"../murmur"
)

func main() {
	s := os.Args[1]

	r := murmur.Hash_v3_32([]byte(s))

	fmt.Println(r)
}
