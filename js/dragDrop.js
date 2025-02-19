function renderDrag() {
    document.querySelectorAll('.draggable').forEach(item => {
        if (item.dataset.hasEventListener) { return; }
        item.dataset.hasEventListener = 'true';
        item.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', item.id);
        });
    });

    document.querySelectorAll('.droppable').forEach(div => {
        if (div.dataset.hasEventListener) { return; }
        div.dataset.hasEventListener = 'true';

        div.addEventListener('dragover', (event) => {
            event.preventDefault();
            if (div.classList.contains('tier')) {
                div.classList.add('drag-over');
            }
        });

        div.addEventListener('dragleave', (event) => {
            if (div.classList.contains('tier')) {
                div.classList.remove('drag-over');
            }
        });

        div.addEventListener('drop', (event) => {
            event.preventDefault();

            const id = event.dataTransfer.getData('text/plain');
            const item = document.getElementById(id);

            const divDrag = document.querySelectorAll('.drag-over')[0];

            if (divDrag) {
                const tier_nom = divDrag.getElementsByClassName('tier-title')[0].innerHTML;
                if (tier_nom == "autres") {
                    addItemAutre(item.getAttribute('id'));
                } else {
                    addItem(item.getAttribute('id'), tier_nom);
                }
            }

            document.querySelectorAll('.tier-content').forEach(tier => {
                const tier_nom = tier.parentElement.getElementsByClassName('tier-title')[0].innerHTML;
                if (tier_nom == "autres" && tier.contains(item)) {
                    removeItemAutre(item.getAttribute('id'));
                }
                else if (tier.contains(item)) {
                    removeItem(item.getAttribute('id'), tier_nom);
                }
            });

            renderItems();
            renderTiers();
        });
    });
}