import Item from "./Item.js";
import KanbanAPI from "./KanbanAPI.js";
var count  = 0; 
export default class Column {
    constructor(id, title) {
        this.element = {};
        this.element.root = Column.create()
        this.element.column = this.element.root.querySelector('.column')
        this.element.heading = this.element.root.querySelector('.column__heading')
        this.element.title = this.element.root.querySelector('.heading__title')
        this.element.numb = this.element.root.querySelector('.numb')
        this.element.body = this.element.root.querySelector('.column__body')
        this.element.items = this.element.root.querySelector('.items')
        this.element.add = this.element.root.querySelector('.plus')

        this.element.title.textContent = title
        this.element.root.dataset.id = id
        this.element.heading.classList.add(`column__heading--${title}`)
        
        this.element.add.addEventListener('click', () => {
            count = count + 1
            if(count < 0) {
                count = 0
            }
            const newItem = KanbanAPI.insertItem(id, "")
            this.renderItem(newItem)
        })
        this.element.add.addEventListener("mouseover", () => {
            this.element.add.innerHTML = "+ Add"
        })
        this.element.add.addEventListener("mouseout", () => {
            this.element.add.innerHTML = "+"
        })
        KanbanAPI.getItems(id).forEach(item => {
            this.renderItem(item)
        })
    }
    static create() {
        const range = document.createRange()
        range.selectNode(document.body)
        return range.createContextualFragment(`
        <div class="column">
            <div class="column__heading">
                <div class="heading__title">Started</div>
                <span class="numb">${count}</span>
            </div>
            <div class="column__body">
                <div class="items"></div>
                <div class="plus">+</div>
            </div>
        </div>`).children[0]
    }
    renderItem(data) {
        const item = new Item(data.id, data.content)
        this.element.items.appendChild(item.element.root)
        const icons = item.element.root.lastElementChild
        const time = icons.firstElementChild
        const check = icons.lastElementChild
        time.addEventListener('click', () => {
            count = count-1;
            if(count < 0) {
                count = 0
            }
            this.element.numb.innerHTML = count
        }) 

    }
}