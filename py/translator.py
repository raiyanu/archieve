from tkinter import *
import numpy
def trans(textes):
    global spaces
    spaces = 0
    wordy = len(textes)
    print(" the number of words in text is : "+str(wordy))
    z = 0
    global numS 
    global numL
    numS =1
    numL =1
    global arr
    arr = []
    global NWord
    #NWord = 0 
    apond =(textes+" ")
    for space_check in apond:
        if space_check == (" "):
            arr.append([(numS),(numL)])
            #NWord=NWord+1
            spaces = spaces + 1
            numS=numL+2
        else:
            numL=numL+1
    print(" there are "+str(spaces)+" words in line")
    print(arr)
print(trans(input(" hey enter a text line : ")))
print("=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=")