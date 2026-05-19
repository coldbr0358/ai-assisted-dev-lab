import tkinter as tk
from calculator import add


def calculate():
    try:
        a = float(entry_a.get())
        b = float(entry_b.get())
        result.set(f"= {add(a, b)}")
    except ValueError:
        result.set("숫자를 입력하세요")

root = tk.Tk()
root.title("계산기")
root.geometry("200x150")
root.resizable(False, False)

entry_a = tk.Entry(root, width=8, justify="center")
entry_a.pack(pady=(15, 5))

tk.Label(root, text="+").pack()

entry_b = tk.Entry(root, width=8, justify="center")
entry_b.pack(pady=5)

tk.Button(root, text="=", width=8, command=calculate).pack(pady=5)

result = tk.StringVar()
tk.Label(root, textvariable=result, font=("Arial", 14, "bold")).pack()

root.mainloop()
