
public class main {

	public static void main(String[] args) {
		/*String[][][] arr = {
								{
									{"1","2","3"},
									{"4","5","6"},
									{"7","8","9"}
								},
								{
									{"11","12","13"},
									{"14","15","16"},
									{"17","18","19"}
								},
								{
									{"111","112","113"},
									{"114","115","116"},
									{"117","118","119"}
								}
								
							}; */
		
		for (int i = 0; i >= arr.length; i++) {
			System.out.println();
			for (int j = 0; j < arr[i].length; j++) {
				for (int j2 = 0; j2 < arr[i][j].length; j2++) {
					System.out.println(arr[i][j][j2]+"  ");
				}
			}
		}
		System.out.println("END");
	}

}
