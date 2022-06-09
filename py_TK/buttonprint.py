from tkinter import *

root = Tk()
g=Entry(root,width=50)
g.pack()
def clicks():
	intro= Label(root,text=g.get()).pack()

butt= Button(root,text="hello click me",command=clicks).pack()
root.mainloop()