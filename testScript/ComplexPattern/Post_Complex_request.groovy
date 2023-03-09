import static net.grinder.script.Grinder.grinder
import static org.junit.Assert.*
import static org.hamcrest.Matchers.*
import net.grinder.script.GTest
import net.grinder.script.Grinder
import net.grinder.scriptengine.groovy.junit.GrinderRunner
import net.grinder.scriptengine.groovy.junit.annotation.BeforeProcess
import net.grinder.scriptengine.groovy.junit.annotation.BeforeThread
import org.junit.Before
import org.junit.BeforeClass
import org.junit.Test
import org.junit.runner.RunWith

import org.ngrinder.http.HTTPRequest
import org.ngrinder.http.HTTPRequestControl
import org.ngrinder.http.HTTPResponse
import org.ngrinder.http.cookie.Cookie
import org.ngrinder.http.cookie.CookieManager

@RunWith(GrinderRunner)
class TestRunner {

    public static GTest test
    public static HTTPRequest request
    public static Map<String, String> headers = [:]
    public static List<Cookie> cookies = []
    public static final int CYCLES = 3
    public static final int REQUESTS_PER_CYCLE_MIN = 1
    public static final int REQUESTS_PER_CYCLE_MAX = 10

    @BeforeProcess
    public static void beforeProcess() {
        HTTPRequestControl.setConnectionTimeout(300000)
        test = new GTest(1, "Test Raffle POST API")
        request = new HTTPRequest()
        grinder.logger.info("before process.")
    }

    @BeforeThread
    public void beforeThread() {
        test.record(this, "test")
        grinder.statistics.delayReports = true
        grinder.logger.info("before thread.")
    }

    @Before
    public void before() {
        request.setHeaders(headers)
        CookieManager.addCookies(cookies)
        grinder.logger.info("before. init headers and cookies")
    }

    @Test
    public void test() {
        for (int i = 0; i < 2; i++) {
			for (int j = 0; j < 5; j++) {
				int raffleId = new Random().nextInt(10000 - 9001) + 9001;
				int user = new Random().nextInt(200000 - 1) + 1;
				int amount = (new Random().nextInt(901) + 100) * 1000;
				Map<String, Object> request_data = ["raffleId": raffleId, "user": user, "amount": amount];
				HTTPResponse response = request.POST("http://slb-16385754.ncloudslb.com/raffles/bid", request_data);
				if (response.statusCode == 301 || response.statusCode == 302) {
					grinder.logger.warn("Warning. The response may not be correct. The response code was {}.", response.statusCode);
				} else {
					assertThat(response.statusCode, is(201));
				}
				Thread.sleep(new Random().nextInt(1000));
			}
		}
	}
}
