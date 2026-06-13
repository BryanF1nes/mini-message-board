function createChangelogItemArray(string) {
    let items = string.split("\n");
    items = items.map(item => item.trim());

    return items;
}

module.exports = { createChangelogItemArray }
