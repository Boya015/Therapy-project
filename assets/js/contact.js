document.getElementById("contact-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("authToken"); // Replace with actual token retrieval logic

    const contactData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(contactData),
    });

    if (response.ok) {
        alert("Message sent successfully!");
    } else {
        alert("Error sending message.");
    }
});
