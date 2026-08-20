import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;

public class Main {

	public static void main(String[] args) {
		// this is example for j panel lets see further
		// well!
		JFrame frm = new JFrame();
		JLabel lab = new JLabel();
		ImageIcon icon = new ImageIcon("imgicon.jpg");
		frm.setIconImage(icon.getImage());
		frm.setTitle("shows one pic app");
		lab.setText(" wellCUM");
		lab.setHorizontalAlignment(JLabel.CENTER);
		//lab.setVerticalTextPosition(JLabel.TOP);
		frm.setBounds(0, 0, 420, 0420);
		frm.setVisible(true);
		frm.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frm.setSize(100, 100);
		frm.add(lab);
	}

}
