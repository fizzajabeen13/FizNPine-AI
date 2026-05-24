async function test() {
    try {
        const res = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "hello" })
        });
        const data = await res.json();
        console.log("RESPONSE:", data);
    } catch (e) {
        console.error("ERROR:", e);
    }
}
test();
