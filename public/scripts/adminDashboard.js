import { baseUrl } from "./constants.js";

/**
 * Fetch all orders and calculate stats.
 */
async function fetchOrdersAndStats() {
  try {
    const response = await fetch(`${baseUrl}/api/admin/orders`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders.");
    }

    const { orders } = await response.json();

    // Render orders and calculate stats
    renderOrders(orders);
    calculateAndRenderStats(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    document.querySelector(
      ".js-orders-table"
    ).innerHTML = `<tr><td colspan="4" class="text-center text-red-600">Error loading orders.</td></tr>`;
  }
}

/**
 * Render orders in the table.
 * @param {Array} orders - Array of order objects.
 */
function renderOrders(orders) {
  const tableBody = document.querySelector(".js-orders-table");

  if (orders.length === 0) {
    tableBody.innerHTML =
      '<tr><td colspan="4" class="text-center text-gray-600">No orders found.</td></tr>';
    return;
  }

  tableBody.innerHTML = orders
    .map(
      (order) => `
      <tr>
        <td class="px-4 py-2 text-sm text-idcText font-mono">${order._id}</td>
        <td class="px-4 py-2 text-sm text-idcText">${order.name}</td>
        <td class="px-4 py-2 text-sm text-idcText">
          <select
            data-order-id="${order._id}"
            class="status-dropdown bg-idcAccent rounded px-2 py-1"
          >
            <option value="Preparing" ${
              order.status === "Preparing" ? "selected" : ""
            }>Preparing</option>
            <option value="Shipped" ${
              order.status === "Shipped" ? "selected" : ""
            }>Shipped</option>
            <option value="Delivered" ${
              order.status === "Delivered" ? "selected" : ""
            }>Delivered</option>
            <option value="Cancelled" ${
              order.status === "Cancelled" ? "selected" : ""
            }>Cancelled</option>
          </select>
        </td>
        <td class="px-4 py-2">
          <button
            data-order-id="${order._id}"
            class="js-view-order bg-idcHighlight text-black rounded px-4 py-2 hover:bg-yellow-600"
          >
            View Details
          </button>
        </td>
      </tr>
    `
    )
    .join("");
}

// Event listener for updating order status
document.addEventListener("change", async (event) => {
  if (event.target.classList.contains("status-dropdown")) {
    const orderId = event.target.dataset.orderId;
    const newStatus = event.target.value;

    try {
      const response = await fetch(`${baseUrl}/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status.");
      }

      // Show a success message
      alert("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  }
});

/**
 * Calculate and render statistics, including charts.
 * @param {Array} orders - Array of order objects.
 */
function calculateAndRenderStats(orders) {
  // Calculate stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalCents, 0);
  const preparingOrders = orders.filter(
    (order) => order.status === "Preparing"
  ).length;
  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;
  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  // Update stats in the DOM
  document.querySelector(".js-total-orders").textContent = totalOrders;
  document.querySelector(".js-total-revenue").textContent = `KSH ${(
    totalRevenue / 100
  ).toLocaleString("en-KE", { minimumFractionDigits: 2 })}`;
  document.querySelector(".js-preparing-orders").textContent = preparingOrders;
  document.querySelector(".js-delivered-orders").textContent = deliveredOrders;

  // Render chart
  renderChart({
    preparingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
  });
}

/**
 * Render a chart showing the distribution of order statuses.
 * @param {Object} stats - Statistics object with order counts.
 */
function renderChart(stats) {
  const ctx = document.getElementById("orderStatusChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Preparing", "Shipped", "Delivered", "Cancelled"],
      datasets: [
        {
          label: "Order Status Distribution",
          data: [
            stats.preparingOrders,
            stats.shippedOrders,
            stats.deliveredOrders,
            stats.cancelledOrders,
          ],
          backgroundColor: [
            "#f4d03f", // Preparing
            "#3498db", // Shipped
            "#2ecc71", // Delivered
            "#e74c3c", // Cancelled
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

/**
 * Fetch order details and open the modal.
 * @param {string} orderId - The ID of the order to fetch.
 */
async function openOrderDetailsModal(orderId) {
  try {
    const response = await fetch(`${baseUrl}/api/admin/orders/${orderId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch order details.");
    }

    const order = await response.json();

    // Populate modal content
    const modalContent = document.querySelector(".js-modal-content");
    modalContent.innerHTML = `
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Customer:</strong> ${order.name}</p>
      <p><strong>Email:</strong> ${order.email}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <p><strong>Total:</strong> KSH ${(order.totalCents / 100).toLocaleString(
        "en-KE",
        {
          minimumFractionDigits: 2,
        }
      )}</p>
      <h4 class="mt-4 font-bold">Items:</h4>
      <ul class="list-disc pl-5">
        ${order.items
          .map(
            (item) =>
              `<li>${item.quantity} x ${item.productId.name} - KSH ${(
                item.priceCents / 100
              ).toFixed(2)}</li>`
          )
          .join("")}
      </ul>
    `;

    // Show modal
    document.getElementById("orderDetailsModal").classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching order details:", error);
    alert("Failed to load order details. Please try again.");
  }
}

/**
 * Close the modal.
 */
function closeModal() {
  document.getElementById("orderDetailsModal").classList.add("hidden");
}

/**
 * Export orders data to CSV.
 * @param {Array} orders - Array of order objects.
 */
function exportOrdersToCSV(orders) {
  const headers = ["Order ID", "Customer", "Status", "Total (KSH)"];
  const rows = orders.map((order) => [
    order._id,
    order.name,
    order.status,
    (order.totalCents / 100).toFixed(2),
  ]);

  // Create CSV content
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Trigger download
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "orders.csv";
  link.click();
  URL.revokeObjectURL(url);
}

// Add event listener for closing the modal
document.getElementById("closeModal").addEventListener("click", closeModal);

// Attach click event to table rows for opening the modal
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-view-order")) {
    const orderId = event.target.dataset.orderId;
    openOrderDetailsModal(orderId);
  }
});

// Export orders on button click
document.getElementById("exportOrders").addEventListener("click", async () => {
  try {
    const response = await fetch(`${baseUrl}/api/admin/orders`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders.");
    }

    const { orders } = await response.json();
    exportOrdersToCSV(orders);
  } catch (error) {
    console.error("Error exporting orders:", error);
    alert("Failed to export orders. Please try again.");
  }
});

// Fetch orders and stats on page load
document.addEventListener("DOMContentLoaded", fetchOrdersAndStats);
