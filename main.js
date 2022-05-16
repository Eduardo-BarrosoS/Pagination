/* const items = document.querySelector('.items')

function ShowItem(numberOfItem) {
    let cards = ''

    if (numberOfItem == 1) {
        cards = `
        <div id="item" class='item'>
            <h3>Item 1</h3>
            <p>Lorem ipsum dolor sit, amet consectetur 
                adipisicing 
                elit. Repudiandae voluptate rem esse cum sunt porro 
                nobis adipisci aut? A quibusdam architecto doloribus 
                velit amet 
                exercitationem accusamus nulla 
                vel corporis minima?</p>
        </div>
        `
    }
    if (numberOfItem == 2) {
        cards = `
        <div id="item" class='item'>
            <h3>Item 2</h3>
            <p>Lorem ipsum dolor sit, amet consectetur 
                adipisicing 
                elit. Repudiandae voluptate rem esse cum sunt porro 
                nobis adipisci aut? A quibusdam architecto doloribus 
                velit amet 
                exercitationem accusamus nulla 
                vel corporis minima?</p>
        </div>
        `
    }
    if (numberOfItem == 3) {
        cards = `
        <div id="item" class='item'>
            <h3>Item 3</h3>
            <p>Lorem ipsum dolor sit, amet consectetur 
                adipisicing 
                elit. Repudiandae voluptate rem esse cum sunt porro 
                nobis adipisci aut? A quibusdam architecto doloribus 
                velit amet 
                exercitationem accusamus nulla 
                vel corporis minima?</p>
        </div>`
    }    
    
    if (numberOfItem == 4) {
        cards = `
        <div id="item" class='item'>
            <h3>Item 4</h3>
            <p>Lorem ipsum dolor sit, amet consectetur 
                adipisicing 
                elit. Repudiandae voluptate rem esse cum sunt porro 
                nobis adipisci aut? A quibusdam architecto doloribus 
                velit amet 
                exercitationem accusamus nulla 
                vel corporis minima?</p>
        </div>
        `
    }
        items.innerHTML = cards 
    
}

ShowItem(2)


const getControls = document.querySelector('.controls')

function pages(totalPage, page) {

    let first = '';
    
    if (page > 1) {
        first += `<div class="first">&#171</div>`;
    }
     
    getControls.innerHTML = first
}

pages(4, 4)



// const card = 2


/* function onClick(div, numb){
    let item = div.getAttribute('id')

    const element = document.querySelectorAll(`${item} div[class*="item"]`)
    
    
    if(numb > 1){
     element.classList.add('.active')

    }
    
}

 








function showMeOnlyOne(){


}

showMeOnlyOne()



// .lastElementChild => perga o ultimo elemento do array








 

function event() {
    const listeningFirst = document.querySelector('.first')
    listeningFirst.addEventListener('click', sum => {
            console.log("")
        })
}

 */








const data = Array.from({ length: 100})
    .map((_, i) => `<div id="item" class='item swiper-slide'>
                        <h3>Item ${i + 1}</h3>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur 
                            adipisicing 
                            elit. Repudiandae voluptate rem esse cum sunt porro 
                            nobis adipisci aut? A quibusdam architecto doloribus 
                            velit amet 
                            exercitationem accusamus nulla 
                            vel corporis minima?
                        </p>
                    </div>
`)

const html = { 
    get(element) {
       return document.querySelector(element)
    }
}

let perPage = 3
const state = {
    page: 1,
    perPage,
    totalPage: Math.ceil(data.length / perPage),
    maxVisibleButtons: 3,
}

const list = {
    create(item) {
        
        const div = document.createElement('div')
        div.classList.add('.items')
        div.innerHTML = item

        html.get('.items').appendChild(div)
    },
    upDate(){
        html.get('.items').innerHTML = ''

        let page = state.page - 1
        let start = page * state.perPage
        let end = start + state.perPage

        console.log()
        const paginatedItems = data.slice(start, end)

        paginatedItems.forEach(list.create)
    }
}

const buttons = {
    elements: html.get('.controls .numbersOfThePage'),
    creart(number)  {
        const button = document.createElement('div')

        button.innerHTML = number;

        if (state.page == number){
            button.classList.add('active')
        }


        button.addEventListener('click', (event) => {
            const page = event.target.innerText

            controls.goTo(page)
            upDate()
        })
        buttons.elements.appendChild(button)

    },
    upDate() {
       buttons.elements.innerHTML = ''

        const { maxLeft, maxRight} = buttons.calculateMaxVisible()

        console.log(maxLeft, maxRight)


            for(let page = maxLeft; page <= maxRight; page++ ){
                buttons.creart(page)
            }
       
    },
    calculateMaxVisible(){
        const { maxVisibleButtons } = state
        
        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2))
        let maxRight = (state.page + Math.floor(maxVisibleButtons / 2))

        if( maxLeft < 1 ){
            maxLeft = 1
            maxRight = maxVisibleButtons
        }
        if ( maxRight > state.totalPage) { 
            maxLeft  = state.totalPage - ( maxVisibleButtons - 1)
            maxRight = state.totalPage

            if( maxLeft < 1) {
                maxLeft = 1
            }
        }
        return { maxLeft, maxRight}
    }
}



const controls = {
    
    
    next() {

        const lastPage = state.page >= state.totalPage;
        state.page++;
        if(lastPage) {
            state.page--;
        }
    },
    prev() {

        state.page--;
        if (state.page < 1 ) {
            state.page++;
        }
    },
    goTo(page) {
        if (page < 1 ){
            page = 1
        }

        state.page = Number(page);

        if (page > state.totalPage) {
            state.page = state.totalPage
        }
    },
    createListeners() {
        html.get('.first').addEventListener('click', ( ) => {
            controls.goTo(1)
            upDate()
        })
        html.get('.last').addEventListener('click', ( ) => {
            controls.goTo(state.totalPage)
            upDate()
        })

        html.get('.prev').addEventListener('click', ( ) => {
            controls.prev()
            upDate()
        })
        html.get('.next').addEventListener('click', ( ) => {
            controls.next()
            upDate()
        })
    },
        
}

 function upDate(){
    list.upDate()
    buttons.upDate()
 }

 function init(){
    upDate()
    controls.createListeners() 

 }
init()


