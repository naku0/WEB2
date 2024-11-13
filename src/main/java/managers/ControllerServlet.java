package managers;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        System.out.println("Get request");
        if (request.getParameter("x") == null ||
                request.getParameter("y") == null ||
                request.getParameter("r") == null) {
            request.getRequestDispatcher("index.jsp").forward(request, response);
        } else {
            request.getRequestDispatcher("/areaCheckServlet").forward(request, response);
            System.out.println("ok");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        String answer = "{ error: Method not allowed}";
        response.getWriter().write(answer);
    }
}
