// Atualiza a lista de pedidos
function atualizarListaPedidos() {
    fetch('/dados')
        .then(response => response.json())
        .then(data => {
            const pedidoUl = document.getElementById('pedidoUl');
            pedidoUl.innerHTML = '';

            data.forEach(row => {
                const li = document.createElement('li');
                li.className = 'pedido';
                li.innerHTML = `<h3>${row.Pedido} - ${row.Tamanho} - ${row.Nome}</h3>`;
                li.addEventListener('click', () => removerPedido(row.Id));
                pedidoUl.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao buscar pedidos:', error));
}

// Remove um pedido
function removerPedido(id) {
    fetch(`/pedido/${id}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                alert('Pedido removido!');
                atualizarListaPedidos();
            } else {
                throw new Error('Erro ao remover o pedido.');
            }
        })
        .catch(error => console.error(error));
}

// Inicializa a lista ao carregar a página
atualizarListaPedidos();
