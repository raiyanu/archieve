from tkinter import *
ray = Tk()
ray.geometry("650x500")
ray.resizable(0, 0)


canvas_menu= Canvas(ray,bg="BLUE")
canvas_menu.pack()
menu = Button(canvas_menu,text="=")
menu.pack()
mainloop()