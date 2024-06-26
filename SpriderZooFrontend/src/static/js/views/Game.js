import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Game");
        this.getData();
    }

    async getHtml() {
        return `
            <h1>Game</h1>
            <p id="perm">You are viewing the Game Page! c</p>
        `;
    }

    async getData() {
        fetch("/api/test", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("perm").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}
