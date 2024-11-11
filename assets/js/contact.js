const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken"); // Retrieve the stored auth token after login

    const contactData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    const response = await fetch("https://your-backend-url.com/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Authorization header with the token
        },
        body: JSON.stringify(contactData),
    });

    if (response.ok) {
        alert("Message sent successfully!");
    } else {
        alert("Error sending message.");
    }
};
