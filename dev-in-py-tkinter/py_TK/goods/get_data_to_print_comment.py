from tkinter import *

root = Tk()
g=Entry(root,width=50)
g.pack()
g.insert(0,"enter your name")
def clicks():
	intro= Label(root,text="hello "+g.get()).pack()

butt= Button(root,text="hello click me",command=clicks).pack()
root.mainloop()