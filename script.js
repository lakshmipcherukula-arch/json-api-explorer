// Tasks
// 1. Fetch and Display Posts
// ● Use fetch() to retrieve a list of posts from
// https://jsonplaceholder.typicode.com/posts
// ● Convert the response to JSON
// ● Dynamically render the post titles and bodies inside the #postList div// so much empty

const fetchButton = document.getElementById("fetchButton");
fetchButton.addEventListener('click', async () =>{
    try
    {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

        const posts = await response.json();

        const postList = document.getElementById('postList')
        console.log(posts);

        posts.forEach (post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = 
        `<hr>
        <h2>${post.title}</h2>
        <p>${post.body}</p>`;
        postList.appendChild(postElement);
    })  
    }catch (error){
        console.error("error fetching the data: ", error);
    }
});

// 2. Create and Send a New Post
// ● Add a form with title and body fields
// ● Use fetch() with the POST method to send the data as JSON to the API
// ● Show a confirmation message with the response data

const postForm = document.getElementById("postForm");//selecting dom elements
const formSuccess = document.getElementById("formSuccess");
//setting up eventlistener
postForm.addEventListener('submit', async (event) => {
    event.preventDefault();//In order to prevent the default behavior of refreshing the page when the form is submitted.


    const titleInput = document.getElementById('titleInput').value;//extracting the user input
    const bodyInput = document.getElementById('bodyInput').value;
    //to keep user input into this object
    const newPostData = {
        title: titleInput,
        body: bodyInput,
        userId: 1 
    };
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPostData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Success:', data);

        formSuccess.innerHTML = `
            <h3>Post Created</h3>
            <p>ID: ${data.id}</p>
            <p>Title: ${data.title}</p>
            <p>${data.body}</p>
        `;

        postForm.reset();
    } catch (error) {
        console.error('Error:', error);
        formSuccess.textContent = 'Failed to create post. Please try again.';
    }
});



