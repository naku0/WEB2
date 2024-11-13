package managers;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class Dot {
    private double x;
    private double y;
    private double r;
    private boolean status;
    private String currentTime;
    private double timeOfCalculating = 0;

    public Dot(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.currentTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
    }

    public void setTimeOfCalculating(double timeOfCalculating) {
        this.timeOfCalculating = timeOfCalculating;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean getStatus() {
        return status;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public double getTimeOfCalculating() {
        return timeOfCalculating;
    }
}
