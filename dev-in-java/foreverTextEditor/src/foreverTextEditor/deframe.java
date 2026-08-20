package foreverTextEditor;

import java.awt.Color;
import java.awt.TextField;

import javax.swing.ImageIcon;
import javax.swing.JFrame;

public class deframe extends JFrame {
	 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	deframe(){
	this.setTitle("Forever TextEditor by RAY");
	ImageIcon img = new ImageIcon("icon01.png");
	this.setIconImage(img.getImage());
	this.setSize(950, 650);
	this.setVisible(true);
	this.getContentPane().setBackground(new Color(45, 46, 45));
	this.setLayout(null);  
	}
}
