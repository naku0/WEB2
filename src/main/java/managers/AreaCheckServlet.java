package managers;

import com.google.gson.Gson;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.ArrayList;


public class AreaCheckServlet extends HttpServlet {
    AreaChecker areaChecker = new AreaChecker();
    Gson gson = new Gson();

    ArrayList<Dot> dots = new ArrayList<>();
    Dot dot;
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            long start = System.nanoTime();
            double x = Double.parseDouble(request.getParameter("x"));
            double y = Double.parseDouble(request.getParameter("y"));
            double r = Double.parseDouble(request.getParameter("r"));
            dot = new Dot(x, y, r);
            dot.setTimeOfCalculating((double) (System.nanoTime() - start) / 1_000_000);
            dot.setStatus(areaChecker.checkSpot(x, y, r));
            dots = (ArrayList<Dot>) request.getSession().getAttribute("dots");
            if (dots == null) {
                dots = new ArrayList<>();
                request.getSession().setAttribute("dots", dots);
            }
            dots.add(dot);
            response.setStatus(HttpServletResponse.SC_OK);
            String res = String.format(gson.toJson(dot));
            response.getWriter().write(res);
            System.out.println("Response JSON: " + res);
        }
        catch (IllegalParameterException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            String answer = "{ error: " + e.getMessage() + "}";
            response.getWriter().write(answer);
        }
    }
}
