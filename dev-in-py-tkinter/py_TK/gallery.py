from tkinter import*
from PIL import ImageTk,Image
root = Tk()
root.iconbitmap('codemy.ico')
#-------------------------------------------


def back():
	return

def forward():
	return

mypic = int(0)
mypics = 'img' + str(mypic) + '.img'
label = Label(root,text=mypics).pack()



root.mainloop()