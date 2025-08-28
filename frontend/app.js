const API_BASE_URL = 'http://localhost:8080/api';

let products = [];
let currentProductId = null;

// Elementos del DOM
const productsGrid = document.getElementById('productsGrid');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const totalProductsElement = document.getElementById('totalProducts');
const activeProductsElement = document.getElementById('activeProducts');
const totalStockElement = document.getElementById('totalStock');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setInterval(loadProducts, 30000); // Actualizar cada 30 segundos
});

// Cargar productos desde la API
async function loadProducts() {
    try {
        showLoading(true);
        hideError();
        
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            products = result.data.products;
            displayProducts(products);
            updateStats(products);
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        showError(`Error al cargar productos: ${error.message}`);
    } finally {
        showLoading(false);
    }
}

// Mostrar productos en la grid
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open" style="font-size: 3em; color: #ccc; margin-bottom: 20px;"></i>
                <h3>No hay productos</h3>
                <p>¡Crea tu primer producto para comenzar!</p>
            </div>
        `;
        return;
    }
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Crear tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-header">
            <div>
                <h3 class="product-name">${escapeHtml(product.name)}</h3>
                <span class="product-category">${product.category}</span>
            </div>
            <div class="product-status ${product.isActive ? 'active' : 'inactive'}">
                ${product.isActive ? '🟢' : '🔴'}
            </div>
        </div>
        
        <p class="product-description">${escapeHtml(product.description)}</p>
        
        <div class="product-details">
            <div class="detail-item">
                <div class="detail-label">Precio</div>
                <div class="detail-value">$${product.price.toFixed(2)}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Stock</div>
                <div class="detail-value">${product.stock} unidades</div>
            </div>
        </div>
        
        <div class="product-meta">
            <small>Creado: ${formatDate(product.createdAt)}</small>
            <br>
            <small>Actualizado: ${formatDate(product.updatedAt)}</small>
        </div>
        
        <div class="product-actions">
            <button class="btn btn-primary" onclick="editProduct('${product._id}')">
                <i class="fas fa-edit"></i> Editar
            </button>
            <button class="btn btn-danger" onclick="confirmDelete('${product._id}', '${escapeHtml(product.name)}')">
                <i class="fas fa-trash"></i> Eliminar
            </button>
        </div>
    `;
    
    return card;
}

// Actualizar estadísticas
function updateStats(products) {
    const total = products.length;
    const active = products.filter(p => p.isActive).length;
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    
    totalProductsElement.textContent = total;
    activeProductsElement.textContent = active;
    totalStockElement.textContent = totalStock;
}

// Filtrar productos
function filterProducts() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    let filtered = products;
    
    if (searchText) {
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText)
        );
    }
    
    if (category) {
        filtered = filtered.filter(product => product.category === category);
    }
    
    displayProducts(filtered);
}

// Utilidades
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showLoading(show) {
    loadingElement.style.display = show ? 'block' : 'none';
}

function showError(message) {
    errorText.textContent = message;
    errorElement.style.display = 'block';
}

function hideError() {
    errorElement.style.display = 'none';
}

function showSuccess(message) {
    // Puedes implementar un sistema de notificaciones toast aquí
    alert(message); // Simple alert por ahora
}

// Exportar funciones para el modal
window.editProduct = async function(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`);
        if (!response.ok) throw new Error('Error al cargar producto');
        
        const result = await response.json();
        if (result.success) {
            openModal(result.data.product);
        }
    } catch (error) {
        showError(error.message);
    }
};

window.confirmDelete = function(productId, productName) {
    currentProductId = productId;
    document.getElementById('confirmMessage').textContent = 
        `¿Estás seguro de que quieres eliminar el producto "${productName}"?`;
    document.getElementById('confirmModal').style.display = 'block';
    
    document.getElementById('confirmButton').onclick = async function() {
        try {
            const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Error al eliminar producto');
            
            const result = await response.json();
            if (result.success) {
                showSuccess('Producto eliminado correctamente');
                loadProducts();
            }
        } catch (error) {
            showError(error.message);
        } finally {
            closeConfirmModal();
        }
    };
};

window.closeConfirmModal = function() {
    document.getElementById('confirmModal').style.display = 'none';
    currentProductId = null;
};