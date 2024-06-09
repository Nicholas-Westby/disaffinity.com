const dataEl = document.getElementById('search-items'),
    searchEl = document.getElementById('search');

let activeEl;

/**
 * Adds each menu item to the search list.
 *
 * @param {HTMLElement} el - The menu item element to be processed.
 */
function processMenuItem(el) {
    const option = document.createElement('option'),
        text = el.innerText.trim(),
        sanitized = text.toLowerCase().replace(/[^a-z]+/g, '-'),
        parentEl = el.closest('ul')?.closest('li')?.querySelector(':scope > a'),
        parentText = parentEl?.innerText?.trim(),
        id = 'gen-' + sanitized + '-' + Math.random().toString(36).substring(2);
    option.value = parentText ? parentText + ' > ' + text : text;
    el.id = id;
    option.setAttribute('data-source-id', id);
    dataEl.appendChild(option);
}

/**
 * Shows the menu item matching the search input text.
 */
function handleSearch() {
    const matchingOption = Array.from(dataEl.querySelectorAll('option'))
            .filter(el => el.value === searchEl.value)[0],
        id = matchingOption?.getAttribute('data-source-id'),
        el = document.getElementById(id);

    if (el) {
        activeEl?.classList?.remove('active');
        el.classList.add('active');
        activeEl = el;
    }
}

/**
 * Initializes the search functionality.
 */
function init() {
    document.querySelectorAll('.l2 a').forEach(processMenuItem);
    searchEl.addEventListener('input', handleSearch);
}

init();
