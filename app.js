const dataEl = document.getElementById('search-items'),
    searchEl = document.getElementById('search');

let activeEl;

document.querySelectorAll('.l2 a').forEach(el => {
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
});

searchEl.addEventListener('input', () => {
    const matchingOption = Array.from(dataEl.querySelectorAll('option'))
            .filter(el => el.value === searchEl.value)[0],
        id = matchingOption?.getAttribute('data-source-id'),
        el = document.getElementById(id);

    if (el) {
        activeEl?.classList?.remove('active');
        el.classList.add('active');
        activeEl = el;
    }
})
