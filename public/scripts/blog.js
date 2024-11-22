import { blogs } from "/data/data.js"; // Import blogs from the data file

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = parseInt(urlParams.get("id"), 10);

  if (isNaN(blogId)) {
    document.getElementById("blog-content").innerHTML = `
      <p class="text-center"><i class="fas fa-exclamation-circle"></i> Blog not found.</p>`;
    return;
  }

  // Find the blog by ID
  const blog = blogs.find((b) => parseInt(b.id, 10) === blogId);

  if (!blog) {
    document.getElementById("blog-content").innerHTML = `
      <p class="text-center"><i class="fas fa-exclamation-circle"></i> Blog not found.</p>`;
    return;
  }

  // Extract blog details
  const title = blog.title || "Untitled Blog";
  const image = blog.image || "/images/default-blog.jpg";
  const date = blog.date || "Date not available";
  const content =
    blog.content ||
    "<p><i class='fas fa-info-circle'></i> Content not available for this blog.</p>";
  const comments = blog.comments || [];
  const metadata = blog.metadata || {};

  // Set metadata for SEO
  document.title = metadata.title || "Blog Post";
  document
    .querySelector("meta[name='description']")
    ?.setAttribute("content", metadata.description || "Blog description");

  const keywordsMetaTag = document.createElement("meta");
  keywordsMetaTag.setAttribute("name", "keywords");
  keywordsMetaTag.setAttribute("content", (metadata.keywords || []).join(", "));
  document.head.appendChild(keywordsMetaTag);

  // Navigation buttons
  const previousButton =
    blogId > 1
      ? `<a href="blog.html?id=${blogId - 1}" class="btn btn-outline-dark">
          <i class="fas fa-arrow-left"></i> Previous
         </a>`
      : "<div></div>";

  const nextButton =
    blogId < blogs.length
      ? `<a href="blog.html?id=${blogId + 1}" class="btn btn-outline-dark">
          Next <i class="fas fa-arrow-right"></i>
         </a>`
      : "<div></div>";

  const backButton = `<a href="/#blog-container" class="btn btn-dark" id="back-to-blogs"><i class="fas fa-arrow-circle-left"></i> Back to Blogs</a>`;

  // Populate blog content
  document.getElementById("blog-content").innerHTML = `
    <h1 class="display-4 fw-bold"><i class="fas fa-feather-alt"></i> ${title}</h1>
    <p class="text-muted"><i class="fas fa-calendar-alt"></i> ${new Date(
      date
    ).toDateString()}</p>
    <img src="${image}" class="blog-image mb-4" alt="${title}" />
    <div class="blog-body">
      ${content}
    </div>
    <h3 class="mt-5"><i class="fas fa-comments"></i> Comments</h3>
    <div id="comments-section">
      ${
        comments.length > 0
          ? comments
              .map(
                (comment) =>
                  `<div class="comment mb-3 p-3 border rounded shadow-sm">
                     <i class="fas fa-user-circle"></i> <strong>${comment.user}</strong>
                     <p>${comment.comment}</p>
                   </div>`
              )
              .join("")
          : `<p><i class="fas fa-info-circle"></i> No comments yet. Be the first to share your thoughts!</p>`
      }
    </div>
    <div class="d-flex justify-content-between mt-5">
      ${previousButton}
      ${backButton}
      ${nextButton}
    </div>`;

  // Add comment form
  document.getElementById("comments-section").insertAdjacentHTML(
    "beforeend",
    `<form id="add-comment-form" class="mt-4">
        <div class="mb-3">
          <label for="username" class="form-label"><i class="fas fa-user"></i> Name</label>
          <input type="text" id="username" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="user-comment" class="form-label"><i class="fas fa-comment"></i> Comment</label>
          <textarea id="user-comment" class="form-control" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300">
          <i class="fas fa-paper-plane"></i> Add Comment
        </button>
      </form>`
  );

  // Handle new comment submissions
  document
    .getElementById("add-comment-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value.trim();
      const userComment = document.getElementById("user-comment").value.trim();

      if (username && userComment) {
        // Add the new comment to the DOM
        const newCommentHtml = `<div class="comment mb-3 p-3 border rounded shadow-sm">
                                  <i class="fas fa-user-circle"></i> <strong>${username}</strong>
                                  <p>${userComment}</p>
                                </div>`;
        document
          .getElementById("comments-section")
          .insertAdjacentHTML("beforeend", newCommentHtml);

        // Clear form fields
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
