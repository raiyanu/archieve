from tkinter import*
from tkinter import ttk
from PIL import Image, ImageTk

ray = Tk()


#creating a frame inside ray tab
frame = LabelFrame(ray,text="this is a dead tab...",padx=100,pady=10)
frame.pack(padx=10,pady=10)
#creating a button inside a frame
label = Label(ray,text='hello baka',font=30)
label.pack()
def on_click():
	label.destroy()
ttk.Button(text="click my butt",command=on_click).pack()
ray.mainloop()