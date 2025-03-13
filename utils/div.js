export default function div(className, textContent) {
    let ele = document.createElement('div')
    ele.className = className
    ele.textContent = textContent

    ele.add = (...args)=>{
        ele.append(...args)
        return ele
    }
    return ele
}