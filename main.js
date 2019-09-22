
let table = document.getElementById("tablee");
let textContent = document.getElementById("text-content");
let sortName = document.getElementById("sort-name");
const animDuration = 1000;
const arrSize = 10;
let anim = anime.timeline({
    autoplay: false,
    duration: animDuration,});
let flag = false;
let currentSorting;
let currentSortingStr;
const quickSortText = `Quicksort is a divide and conquer algorithm. Quicksort first divides a large array into two smaller sub-arrays: the low elements and the high elements. Quicksort can then recursively sort the sub-arrays. The steps are:

                        1.Pick an element, called a pivot, from the array.
                        2.Partitioning: reorder the array so that all elements with values less than the pivot come before the pivot, while all elements with values greater than the pivot come after it (equal values can go either way). After this partitioning, the pivot is in its final position. This is called the partition operation.
                        3.Recursively apply the above steps to the sub-array of elements with smaller values and separately to the sub-array of elements with greater values.
                        The base case of the recursion is arrays of size zero or one, which are in order by definition, so they never need to be sorted.

                        The pivot selection and partitioning steps can be done in several different ways; the choice of specific implementation schemes greatly affects the algorithm's performance.`
const bubbleSortText = `Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements "bubble" to the top of the list. Although the algorithm is simple, it is too slow and impractical for most problems even when compared to insertion sort. Bubble sort can be practical if the input is in mostly sorted order with some out-of-order elements nearly in position.`


main();
htmlManagment();

function htmlManagment()
{
    let startBtn = document.getElementById("startButton");
        invertColors(startBtn, "black", "white")
            startBtn.addEventListener("click", function(){
                if (flag == false)
                {
                    startBtn.innerHTML = "<p>pause</p>";
                    anim.play();
                    flag = true; 
                }
                else
                {
                    startBtn.innerHTML = "<p>play</p>";
                    anim.pause()
                    flag = false;
                }
                
            })
    let bubbleSortBtn = document.getElementById("bubbleSortBtn");
        invertColors(bubbleSortBtn, "black", "white")
        bubbleSortBtn.addEventListener("click", function(){
            sessionStorage.setItem('sorting', 'bubbleSort')
            document.location.reload();

        })
    let quickSortBtn = document.getElementById("quickSortBtn");
        invertColors(quickSortBtn, "black", "white")
        quickSortBtn.addEventListener("click", function(){
            sessionStorage.setItem('sorting', 'quickSort' )
            document.location.reload();
            
        })
function invertColors(obj,color1,color2){
    let _obj = obj;
    _obj.addEventListener("mouseenter",function(){
        _obj.style.color = color1;
        _obj.style.backgroundColor = color2;
    }) 
    _obj.addEventListener("mouseout",function(){
        _obj.style.color = color2;
        _obj.style.backgroundColor = color1;
    })
}
}
function animation(arr, sort=bubbleSort)
{
    setTimeout(function(){
        if (sort == null)
        {
            sort = bubbleSort;
        }
        let sortedArr = sort(arr)
     }, 10)
}
function main()
{
    let arr = createElements(arrSize)
    let tempArr = arr.slice();

    if(sessionStorage.length !=0 )
    {
        currentSortingStr = sessionStorage.getItem('sorting')
        if(currentSortingStr == "bubbleSort")
        {
            currentSorting = bubbleSort;
            sortName.innerHTML = `<h2>Bubble sort<h2>`;
            textContent.innerHTML = `<p>${bubbleSortText}<p>`;

        }
        else if(currentSortingStr == "quickSort")
        {
            currentSorting = quickSort;
            sortName.innerHTML = `<h2>Quick sort<h2>`;
            textContent.innerHTML = `<p>${quickSortText}<p>`
        }
    }
    animation(tempArr, currentSorting)
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
        div.classList.add("block")
        div.style.backgroundColor = getRandomColor();
        div.innerHTML = '<p>'+ getRandomInt(0,100) +'</p>'
        div.position = 0;
        element.appendChild(div);
        elements.push(div)
    }
    return elements;
}
function getRandomColor(){
    let colors = ["#b0b0b0","#9e9e9e","#8a8a8a","#757575","#5c5c5c","#474747", "#333333", "#242424"]
    let color = colors[getRandomInt(0,colors.length - 1)]
    return color;
}
function swap(arr, firstIndex, secondIndex)
{
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
}
function quickSort(arr,left = 0 ,right = arrSize-1) {
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

