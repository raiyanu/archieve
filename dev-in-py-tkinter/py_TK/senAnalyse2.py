from tkinter import *
from tkinter import ttk
from tkinter import scrolledtext

ray = Tk()
ray.geometry("700x350")
# set minimum window size value
#ray.minsize(200, 200)
 
# set maximum window size value
#ray.maxsize(400, 400)
# ============================================================      make functions
num= 0
def runny():
    global num
    #cvscversbtynhytntynyrrrrrrrrrrrrrrrrrrrr            below here dsdvsfvsfvsvfvsfdbsbgbfbgbvcxc
    Label(ray,text="well you entered    :   "+box.get(START,END)).pack()
    global spaces
    spaces = 0
    new = ""
    for let in box.get():
        if let == "a":
            new = new + "g"
        else:
            new  = new + let
    wordy = len(box.get())
    Label(ray,text=" the number of words in text is : "+str(wordy))
    z =0
    global numS 
    global numL
    numS =1
    numL =1
    global arr
    arr = []
    global NWord
    NWord = 0 
    apond =(str(box.get())+" ")
    for space_check in apond:
        if space_check == (" "):
            arr.append([(numS),(numL)])
            NWord=NWord+1
            spaces = spaces +1  
            numS=numL+1
        else:
            numL=numL+1
    Label(ray,text=" there are "+str(spaces)+" words in line").pack()
    Label(ray,text="and index position of each letter is :"+str(arr)).pack()
    Label(ray,text="============================================================").pack()
    box.delete(0,END)
    box.insert(0,"default text number "+str(num))
    num = num+1
# ============================================================      define object
box = scrolledtext.ScrolledText(ray, wrap = WORD,width = 40,height = 10)
#box.insert("hey it's a default text ne")
button = Button(ray,command=runny,text="analysis")
# ============================================================      desplay object
box.pack()
button.pack()
mainloop()