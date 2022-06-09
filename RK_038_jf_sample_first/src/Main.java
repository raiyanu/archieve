import java.awt.Color;
import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.border.Border;

public class Main {

	public static void main(String[] args) {
		System.out.println("program is started");
		JFrame frame = new JFrame();
		Border bord= BorderFactory.createLineBorder(Color.cyan, 3);
		
		frame.setSize(450,450);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setTitle("My First App frame in JAVA!");
		//frame.setBackgrond();
		
		ImageIcon ico1 = new ImageIcon("imgicon2.jpg");
		ImageIcon ico = new ImageIcon("pic3.jpg");
		frame.setIconImage(ico1.getImage());
	
		frame.getContentPane().setBackground(new Color(123,50,250));
		System.out.println("control is here");
		frame.setBackground(new Color(125,50,150));
		
		JLabel lab = new JLabel();
		lab.setBorder(bord);
		//lab.setOpaque(true);
		lab.setIcon(ico);
		lab.setHorizontalAlignment(JLabel.CENTER);
		lab.setVerticalTextPosition(JLabel.TOP);
		lab.setBounds(30, 30, 30, 30);
		frame.add(lab);
		frame.setVisible(true);
		//frame.pack();
		//frame.setLayout(nulll);
		int he = frame.getHeight();
		int wi = frame.getWidth();
		JLabel labT = new JLabel();
		labT.setText("this is height :"+he+" this is height :"+wi);

		frame.add(labT);
		

	}

}
