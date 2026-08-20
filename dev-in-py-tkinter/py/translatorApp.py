from tkinter import *
import numpy
ray = Tk()
ray.geometry("600x550")
rayc =LabelFrame(ray)
def trans(textes):
    global spaces
    spaces = 0
    new = ""
    for let in textes:
        if let == "a":
            new = new + "g"
        else:
            new  = new + let
    wordy = len(textes)
    print(" the number of words in text is : "+str(wordy))
    z =0
    global numS 
    global numL
    numS =0
    numL =0
    global arr
    arr = []
    global NWord
    NWord = 0 
    for space_check in textes:
        if space_check == (" "):
            arr.append([(numS),(numL)])
            NWord=NWord+1
            spaces = spaces +1  
            numS=numL+1
        else:
            numL=numL+1
    print(" there are "+str(spaces)+" words in line")
    print(arr)
print("=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=")
boxy = Entry(rayc)
boxy.grid(row=1,column=0)
print(trans(input(" hey enter a text line : ")))
print("=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=")
mainloop()