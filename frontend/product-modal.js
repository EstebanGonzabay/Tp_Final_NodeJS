let currentProduct = null;

function openModal(product = null) {
    currentProduct = product;
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const submitText = document.getElementById('submitText');
    
    if (product) {
        modalTitle.textContent = 'Editar Producto';
        submitText.textContent = 'Actualizar Producto';
        fillForm(product);
    } else {
        modalTitle.textContent = 'Nuevo Producto';
        submitText.textContent = 'Crear Producto';
        resetForm();
    }
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    currentProduct = null;
    resetForm();
}

function resetForm() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
}

function fillForm(product) {
    document.getElementById('productId').value = product._id;
    document.getElementById('name').value = product.name;
    document.getElementById('description').value = product.description;
    document.getElementById('price').value = product.price;
    document.getElementById('stock').value = product.stock;
    document.getElementById('category').value = product.category;
}

async function handleSubmit(event) {
    event.preventDefault();
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    
    try {
        // Mostrar loading en el botón
        submitText.style.display = 'none';
        submitSpinner.style.display = 'inline-block';
        submitButton.disabled = true;
        
        const formData = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            stock: parseInt(document.getElementById('stock').value),
            category: document.getElementById('category').value
        };
        
        let url = `${API_BASE_URL}/products`;
        let method = 'POST';
        
        if (currentProduct) {
            url += `/${currentProduct._id}`;
            method = 'PUT';
        }
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            showSuccess(currentProduct ? 'Producto actualizado correctamente' : 'Producto creado correctamente');
            closeModal();
            loadProducts();
        }
        
    } catch (error) {
        showError(`Error: ${error.message}`);
    } finally {
        // Restaurar botón
        submitText.style.display = 'inline-block';
        submitSpinner.style.display = 'none';
        submitButton.disabled = false;
    }
}

// Cerrar modal al hacer click fuera
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    const confirmModal = document.getElementById('confirmModal');
    
    if (event.target === modal) {
        closeModal();
    }
    if (event.target === confirmModal) {
        closeConfirmModal();
    }
};

// Exportar funciones globalmente
window.openModal = openModal;
window.closeModal = closeModal;
window.handleSubmit = handleSubmit;