from tkinter import *

root = Tk()
#making widgets (generation)
myLabel1 = Label(root, text="hello1").grid(row=0, column=0)
myLabel2 = Label(root, text="hello2").grid(row=0, column=1)
myLabel3 = Label(root, text="hello3").grid(row=1,column=0)
myLabel4 = Label(root, text="hello4").grid(row=1,column=1)
#showing widgets to display out (output)

#myLabel1.
#myLabel2.grid
#myLabel3.grid(row=1, column=0)
#myLabel4.grid(row=1, column=1)
root.mainloop()