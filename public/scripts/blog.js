import { blogs } from "/data/data.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");

  // Handle invalid or missing blog ID
  if (!blogId) {
    document.getElementById("blog-content").innerHTML = `
      <p class="text-center text-xl font-bold">
        <i class="fas fa-exclamation-circle text-primary"></i> Blog not found.
      </p>`;
    return;
  }

  // Find the blog post by ID
  const blog = blogs.find((b) => b.id === blogId);

  // If the blog is not found, show an error message
  if (!blog) {
    document.getElementById("blog-content").innerHTML = `
      <p class="text-center text-xl font-bold">
        <i class="fas fa-exclamation-circle text-primary"></i> Blog not found.
      </p>`;
    return;
  }

  // Update page metadata for SEO
  document.title = blog.metadata.title || "Blog Post";
  document
    .querySelector("meta[name='description']")
    ?.setAttribute("content", blog.metadata.description || "");
  document
    .querySelector("meta[name='keywords']")
    ?.setAttribute("content", blog.metadata.keywords.join(", ") || "");

  // Render the blog post content
  document.getElementById("blog-content").innerHTML = `
    <h1 class="text-4xl font-bold text-primary mb-4">${blog.title}</h1>
    <p class="text-gray-400 text-sm mb-4">
      <i class="fas fa-calendar-alt"></i> ${new Date(blog.date).toDateString()}
    </p>
    <img src="${blog.image}" class="rounded-lg shadow-lg mb-6 w-full" alt="${
    blog.title
  }" />
    <div class="prose prose-lg text-gray-300">${blog.content}</div>
    <h3 class="text-2xl font-bold text-primary mt-10 mb-4">
      <i class="fas fa-comments"></i> Comments
    </h3>
    <div id="comments-section">
      ${
        blog.comments.length > 0
          ? blog.comments
              .map(
                (comment) => `
                  <div class="comment mb-4 p-4 border rounded-lg shadow-md">
                    <i class="fas fa-user-circle text-primary"></i>
                    <strong class="text-gray-200">${comment.user}</strong>
                    <p class="mt-2">${comment.comment}</p>
                  </div>`
              )
              .join("")
          : `<p class="text-gray-400">
              <i class="fas fa-info-circle"></i> No comments yet. Be the first to share your thoughts!
            </p>`
      }
    </div>
    <form id="add-comment-form" class="mt-6 bg-accent p-6 rounded-lg shadow-md">
      <h4 class="text-xl font-bold text-gray-300 mb-4">
        <i class="fas fa-pen"></i> Add a Comment
      </h4>
      <div class="mb-4">
        <label for="username" class="block text-gray-300">Name</label>
        <input
          type="text"
          id="username"
          class="w-full mt-2 p-3 bg-gray-800 text-gray-300 rounded-lg"
          placeholder="Enter your name"
          required
        />
      </div>
      <div class="mb-4">
        <label for="user-comment" class="block text-gray-300">Comment</label>
        <textarea
          id="user-comment"
          class="w-full mt-2 p-3 bg-gray-800 text-gray-300 rounded-lg"
          rows="4"
          placeholder="Write your comment here..."
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-opacity-90"
      >
        <i class="fas fa-paper-plane"></i> Submit
      </button>
    </form>
  `;

  // Handle the Add Comment form submission
  document
    .getElementById("add-comment-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value.trim();
      const userComment = document.getElementById("user-comment").value.trim();

      if (username && userComment) {
        // Add the new comment to the comments section
        const newCommentHTML = `
          <div class="comment mb-4 p-4 border rounded-lg shadow-md">
            <i class="fas fa-user-circle text-primary"></i>
            <strong class="text-gray-200">${username}</strong>
            <p class="mt-2">${userComment}</p>
          </div>`;
        document
          .getElementById("comments-section")
          .insertAdjacentHTML("beforeend", newCommentHTML);

        // Clear the form fields
        document.getElementById("username").value = "";
        document.getElementById("user-comment").value = "";
      }
    });

  // Smooth scroll for "Back to Blogs" button
  document.addEventListener("click", (event) => {
    if (event.target.id === "back-to-blogs") {
      event.preventDefault();
      const target = document.getElementById("blog-container");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});
