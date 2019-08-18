
let table = document.getElementById("tablee");
const animDuration = 500;
let anim = anime.timeline({
    duration: animDuration,});

main()
function main()
{
    let arr = createElements(10)
    console.log(arr);
    let tempArr = arr.slice();
    setTimeout(function(){
       //let sortedArr = bubbleSort(tempArr)
        //console.log(sortedArr);
      let sortedArr = quickSort(tempArr, 0, tempArr.length-1)
        console.log(sortedArr);
    }, 10)
} 
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function bubbleSort(arr) {
    let length = arr.length;
    for(let i = 0; i < length - 1; i++)
    {
        for(let j = 0; j < length - 1 - i; j++  )
        {
            if (+arr[j+1].innerText < +arr[j].innerText)
            {
                swap(arr,j,j+1);
                //animation
                anim.add({
                    targets: arr[j],
                    keyframes: [
                        {translateY: -54},
                        {translateX: arr[j].position - 54},
                        {translateY: 0},
                    ],
                })
                arr[j].position -=54;
                anim.add({
                    targets:arr[j+1],
                    keyframes: [
                        {translateY: -54},
                        {translateX: arr[j+1].position + 54},
                        {translateY: 0},
                    ],
                },'-='+animDuration)
                arr[j+1].position +=54;
            }
            else
            {
                anim.add({
                    targets: arr[j],
                    keyframes: [
                        {translateY: -54},
                        {translateY: 0},
                      ],
                })
                anim.add({
                    targets:arr[j+1],
                    keyframes: [
                        {translateY: -54},
                        {translateY: 0},
                      ],
                },'-='+animDuration)
            }
        }
    }
    return arr;
}
function createElements(length){
   let elements = [];
    for (i = 0; i < length; i++ )
    {
        let element = document.createElement("td");
        table.appendChild(element);
        let div = document.createElement("div");
        div.id ="block"+i;
        div.style.backgroundColor = getRandomColor();
        div.innerHTML = '<p>'+ getRandomInt(0,100) +'</p>'
        div.position = 0;
        element.appendChild(div);
        elements.push(div)
    }
    return elements;
}
function getRandomColor(){
    let colors = ["#ff0000","#ffa200","#ffea00","#3cff00","#00fff7","#0022ff", "#aa00ff", "#ff00aa"]
    let color = colors[getRandomInt(0,colors.length - 1)]
    return color;
}
function swap(arr, firstIndex, secondIndex)
{
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
}
function quickSort(arr,left,right) {
    function partition(arr,left,right) {
        let pivot   = arr[Math.floor((left+right) / 2)];
        let   i     = left;
        let   j     = right;
        anim.add({
            targets: pivot,
            keyframes: [
                {translateY: 54},
            ],
        })
        while (i <= j) {
            while (+arr[i].innerText < +pivot.innerText) {
                i++;
            }
            while (+arr[j].innerText > +pivot.innerText) {
                j--;
            }
            if (i <= j)     // if (i <= j) 
            {
                swap(arr, i, j);
                //animation
                if(i !=j)
                {
                    anim.add({
                        targets: arr[j],
                        keyframes: [
                            {translateY: -54},
                            {translateX: arr[j].position + 54*(j-i)},
                            {translateY: 0},
                        ],
                    })
                    arr[j].position +=54*(j-i);
                    anim.add({
                        targets:arr[i],
                        keyframes: [
                            {translateY: -54},
                            {translateX: arr[i].position - 54*(j-i)},
                            {translateY: 0},
                        ],
                    },'-='+animDuration)
                    arr[i].position -=54*(j-i);
                }
                    i++;
                    j--;
        }
        }
        anim.add({
            targets: pivot,
            keyframes: [
                {translateY: 0},
            ],
        })
        return i;
    }
    let index;
    if (arr.length > 1) {
       // left = 0;
       // right = items.length - 1;
        index = partition(arr,left,right);
        if (left < index - 1) {
            quickSort(arr, left, index - 1);
        }
        if (index < right) {
            quickSort(arr, index, right);
        }
    }
    return arr;
}

