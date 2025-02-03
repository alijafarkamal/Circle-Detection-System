#include <opencv2/opencv.hpp>
#include <vector>

cv::Mat preprocessImage(const cv::Mat& inputImage) {
    cv::Mat grayImage, blurredImage;
    cv::cvtColor(inputImage, grayImage, cv::COLOR_BGR2GRAY);
    cv::GaussianBlur(grayImage, blurredImage, cv::Size(9, 9), 2);
    return blurredImage;
}

std::vector<cv::Vec3f> detectCircles(const cv::Mat& preprocessedImage, double dp, double minDist, int param1, int param2, int minRadius, int maxRadius) {
    std::vector<cv::Vec3f> circles;
    cv::HoughCircles(preprocessedImage, circles, cv::HOUGH_GRADIENT, dp, minDist, param1, param2, minRadius, maxRadius);
    return circles;
}

std::vector<std::vector<cv::Vec3f>> groupConcentricCircles(const std::vector<cv::Vec3f>& circles, double eps) {
    std::vector<std::vector<cv::Vec3f>> groups;
    if (circles.empty()) {
        return groups;
    }
    std::vector<bool> visited(circles.size(), false);

    for (size_t i = 0; i < circles.size(); ++i) {
        if (!visited[i]) {
            std::vector<cv::Vec3f> group;
            group.push_back(circles[i]);
            visited[i] = true;

            for (size_t j = i + 1; j < circles.size(); ++j) {
                if (!visited[j]) {
                    double distance = cv::norm(cv::Point2f(circles[i][0], circles[i][1]), cv::Point2f(circles[j][0], circles[j][1]));
                    if (distance <= eps) {
                        group.push_back(circles[j]);
                        visited[j] = true;
                    }
                }
            }
            groups.push_back(group);
        }
    }
    return groups;
}

void drawCirclesAndGroups(cv::Mat& outputImage, const std::vector<std::vector<cv::Vec3f>>& groups) {
    std::vector<cv::Scalar> colors = {cv::Scalar(0, 0, 255), cv::Scalar(0, 255, 0), cv::Scalar(255, 0, 0)};
    for (size_t i = 0; i < groups.size(); ++i) {
        cv::Scalar color = colors[i % colors.size()];
        for (const auto& circle : groups[i]) {
            cv::Point center(cvRound(circle[0]), cvRound(circle[1]));
            int radius = cvRound(circle[2]);
            cv::circle(outputImage, center, radius, color, 3, cv::LINE_AA);
            cv::circle(outputImage, center, 2, color, 3, cv::LINE_AA);
        }
    }
}

int main(int argc, char** argv) {
    if (argc != 2) {
        std::cerr << "Usage: " << argv[0] << " <path_to_image>" << std::endl;
        return -1;
    }

    cv::Mat inputImage = cv::imread(argv[1]);
    if (inputImage.empty()) {
        std::cerr << "Error: Could not open or find the image." << std::endl;
        return -1;
    }

    cv::Mat preprocessedImage = preprocessImage(inputImage);
    std::vector<cv::Vec3f> circles = detectCircles(preprocessedImage, 1, 20, 100, 30, 1, 30);
    std::vector<std::vector<cv::Vec3f>> groups = groupConcentricCircles(circles, 10);
    drawCirclesAndGroups(inputImage, groups);
    cv::imshow("Detected Circles", inputImage);
    cv::waitKey(0);
    return 0;
}