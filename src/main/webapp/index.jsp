<%@ page import="java.util.ArrayList" %>
<%@ page import="managers.Dot" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP LAB</title>
    <link rel="stylesheet" href="stylings.css">
    <script src="scripts.js" defer></script>
    <script src="area.js" defer></script>
</head>
<body>
<header>
    <div class="name">
        МАМОНТОВ АЛЕКСАНДР
    </div>
</header>
<main>
    <div class="main-info">
        <div class="graph">
            <canvas id="canvas"></canvas>
        </div>
        <div class="inputs" id="coordInputs">
            <form onsubmit="submitForm(event)" class="form" autocomplete="off">
                <div class="x">
                    <p class="x-text">X:</p>
                    <div class="x-inputs">
                        <label>
                            <input type="radio" name="x1" value="-2"/>
                            -2
                        </label>
                        <label>
                            <input type="radio" name="x1" value="-1.5"/>
                            -1.5
                        </label>
                        <label>
                            <input type="radio" name="x1" value="-1"/>
                            -1
                        </label>
                        <label>
                            <input type="radio" name="x1" value="-0.5"/>
                            -0.5
                        </label>
                        <label>
                            <input type="radio" name="x1" value="0"/>
                            0
                        </label>
                        <label>
                            <input type="radio" name="x1" value="0.5"/>
                            0.5
                        </label>
                        <label>
                            <input type="radio" name="x1" value="1"/>
                            1
                        </label>
                        <label>
                            <input type="radio" name="x1" value="1.5"/>
                            1.5
                        </label>
                        <label>
                            <input type="radio" name="x1" value="2"/>
                            2
                        </label>
                    </div>
                </div>
                <div class="y-container">
                    <input class="" type="text" name="y" id="y" autocomplete="off" required/>
                    <p>(-3;5)</p>
                    <label class="text" for="y">
                        Y:
                    </label>
                </div>
                <div class="r">
                    <p class="r-text">R:</p>
                    <label>
                        <input type="checkbox" name="r" value="1"/>
                        1
                    </label>
                    <label>
                        <input type="checkbox" name="r" value="2">
                        2
                    </label>
                    <label>
                        <input type="checkbox" name="r" value="3"/>
                        3
                    </label>
                    <label>
                        <input type="checkbox" name="r" value="4">
                        4
                    </label>
                    <label>
                        <input type="checkbox" name="r" value="5"/>
                        5
                    </label>

                </div>
                <button type="submit" class="sendDataButton">ОТПРАВИТЬ</button>
            </form>
        </div>
    </div>
    <table class="table" id="table">
        <thead class="table-head">
        <tr>
            <th scope="col" class="item">X</th>
            <th scope="col" class="item">Y</th>
            <th scope="col" class="item">R</th>
            <th scope="col" class="item">СТАТУС</th>
            <th scope="col" class="item">ВРЕМЯ ВЫПОЛНЕНИЯ</th>
            <th scope="col" class="item">ВРЕМЯ ВЫПОЛНЕНИЯ СКРИПТА</th>
        </tr>
        </thead>
        <tbody id="table-body">
        <%
            ArrayList<Dot> dots = (ArrayList<Dot>) request.getSession().getAttribute("dots");
            if (dots != null) {
                for (Dot dot : dots) {
        %>
        <tr class="row">
            <td class="item"><%= dot.getX() %>
            </td>
            <td class="item"><%= dot.getY() %>
            </td>
            <td class="item"><%= dot.getR() %>
            </td>
            <td class="item"><%= dot.getStatus() %>
            </td>
            <td class="item"><%= dot.getCurrentTime() %>
            </td>
            <td class="item"><%= dot.getTimeOfCalculating() %> ms</td>
        </tr>
        <%
                }
            }
        %>
        </tbody>
    </table>
    <script defer>
        const sessionPoints = [
            <%
                if (dots != null) {
                    for (int i = 0; i < dots.size(); i++) {
                        Dot dot = dots.get(i);
                        out.print("{x: " + dot.getX() + ", y: " + dot.getY() + ", r: " + dot.getR() + ", status: '" + dot.getStatus() + "'}");
                        if (i < dots.size() - 1) {
                            out.print(", ");
                        }
                    }
                }
            %>
        ];

        const lastDot = sessionPoints[sessionPoints.length - 1];
        const lastR = lastDot ? lastDot.r : 0;
        document.addEventListener("DOMContentLoaded", () => {
            drawGrid();
            console.log(<%=dots == null%>);
            <% if (dots != null && !dots.isEmpty()) { %>
            const r = lastR;
            drawTriangle(r);
            drawRect(r);
            drawCircle(r);
            drawCoords(r);
            sessionPoints.forEach(point => {
                points.push(point);
                drawDot(point.x, point.y, point.r, point.status);
            });
            <% } %>
            drawAxis();
            redrawPoints(r);
        });
    </script>

</main>
</body>
</html>