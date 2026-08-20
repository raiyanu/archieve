from tkinter import*
from PIL import ImageTk,Image
root = Tk()
root.iconbitmap('icony1.ico')
#-------------------------------------------

""" if(condition):
      indented Statement Block"""

def back():
	global pic_num
	if (pic_num > 0):
		pic_num = pic_num - 1
	#pic display 
	picture.grid_forget()
	picVar = Label(image=pic_name_path)
	picVar.grid(row=1, column=0,columnspan=3)
	#control
	buttonR = Button(root, text="<<",command=back).grid(row=2, column=0,)
	buttonQuit = Button(root, text="Exit", command=root.quit).grid(row=2, column=1)
	buttonF = Button(root, text=">>", command=forward).grid(row=2, column=3)
def forward():
	global pic_num
	if (pic_num < 12):
		pic_num = pic_num + 1
	#pic display 
	picVar = Label(image=pic_name_path)
	picVar.grid(row=1, column=0,columnspan=3)
	#control
	buttonR = Button(root, text="<<",command=back).grid(row=2, column=0,)
	buttonQuit = Button(root, text="Exit", command=root.quit).grid(row=2, column=1)
	buttonF = Button(root, text=">>", command=forward).grid(row=2, column=3)



#picture definition
pic_num = int(0)
pic_name = ("img" + "(" + str(pic_num) + ")" + ".jpg")
pic_name_path = ImageTk.PhotoImage(Image.open("pics/img" + "(" + str(pic_num) + ")"+ ".jpg"))
picture = Label(image=pic_name_path)
pic_label = str (" PIC NAME  :    ") + str(pic_name).upper()


#pic name 
label = Label(root,text=pic_label).grid(row=0, column=0,columnspan=2)

#pic display 
#picVar = Label(image=picture)
picture.grid(row=1, column=0,columnspan=3)
#control
buttonR = Button(root, text="<<",command=back).grid(row=2, column=0,)
buttonQuit = Button(root, text="Exit", command=root.quit).grid(row=2, column=1)
buttonF = Button(root, text=">>", command=forward).grid(row=2, column=3)
root.mainloop()