package managers;

public class AreaChecker {
    public boolean checkSpot(double x, double y, double r) throws IllegalParameterException {
        return checkAxis(x, y, r);
    }

    private boolean checkAxis(double x, double y, double r) throws IllegalParameterException {
        if (!(x>=-2 && x<=2 && y>=-3 && y<=5 && r>=1 && r<=5)) {
            System.out.println("Wrong parameters");
            throw new IllegalParameterException("Wrong parameters");
        }
        else {
            if (x*r >= 0 && y*r >= 0) {
                return checkTriangle(x, y, r);
            } else if (x*r <= 0 && y*r >= 0) {
                return checkRectangle(x, y, r);
            } else if (x*r <= 0 && y*r <= 0) {
                return checkCircle(x, y, r);
            } else if (x*r >= 0 && y*r <= 0) {
                return false;
            } else return x == 0 && y == 0;
        }
    }

    private boolean checkTriangle(double x, double y, double r){
        return (y<=-x+0.5*r);
    }
    private boolean checkRectangle(double x, double y, double r){
        return (x >= (-0.5*r) && y <= r);
    }
    private boolean checkCircle(double x, double y, double r){
        return (x*x + y*y) <= r*r;
    }
}
