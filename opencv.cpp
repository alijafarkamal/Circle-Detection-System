#include <opencv2/opencv.hpp>
#include <vector>
#include <iostream>
using namespace std;

cv::Mat preprocessImage(const cv::Mat& inputImage) {
    cv::Mat grayImage, blurredImage, threshImage;
    cv::cvtColor(inputImage, grayImage, cv::COLOR_BGR2GRAY);
    cv::GaussianBlur(grayImage, blurredImage, cv::Size(9, 9), 2);
    cv::adaptiveThreshold(blurredImage, threshImage, 255, cv::ADAPTIVE_THRESH_GAUSSIAN_C, cv::THRESH_BINARY_INV, 11, 2);
    return threshImage;
}

vector<cv::Vec3f> detectCircles(const cv::Mat& preprocessedImage, double dp, double minDist, int param1, int param2, int minRadius, int maxRadius) {
    vector<cv::Vec3f> circles;
    cv::HoughCircles(preprocessedImage, circles, cv::HOUGH_GRADIENT, dp, minDist, param1, param2, minRadius, maxRadius);
    return circles;
}

vector<vector<cv::Vec3f>> groupConcentricCircles(const vector<cv::Vec3f>& circles, double eps) {
    vector<vector<cv::Vec3f>> groups;
    if (circles.empty()) {
        return groups;
    }
    vector<bool> visited(circles.size(), false);

    for (size_t i = 0; i < circles.size(); ++i) {
        if (!visited[i]) {
            vector<cv::Vec3f> group;
            group.push_back(circles[i]);
            visited[i] = true;

            for (size_t j = i + 1; j < circles.size(); ++j) {
                if (!visited[j]) {
                    double distance = cv::norm(cv::Point2f(circles[i][0], circles[i][1]) - cv::Point2f(circles[j][0], circles[j][1]));
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

void drawCirclesAndGroups(cv::Mat& outputImage, const vector<vector<cv::Vec3f>>& groups) {
    vector<cv::Scalar> colors = {cv::Scalar(0, 0, 255), cv::Scalar(0, 255, 0), cv::Scalar(255, 0, 0)};
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

void processImage(const string& imagePath, double dp, double minDist, int param1, int param2, int minRadius, int maxRadius, double eps) {
    cv::Mat inputImage = cv::imread(imagePath);
    if (inputImage.empty()) {
        cout << "Error: Could not open or find the image." << endl;
        return;
    }

    cv::Mat preprocessedImage = preprocessImage(inputImage);
    vector<cv::Vec3f> circles = detectCircles(preprocessedImage, dp, minDist, param1, param2, minRadius, maxRadius);
    cout << "Detected " << circles.size() << " circles." << endl;
    for (const auto& circle : circles) {
        cout << "Circle: center=(" << circle[0] << "," << circle[1] << "), radius=" << circle[2] << endl;
    }
    vector<vector<cv::Vec3f>> groups = groupConcentricCircles(circles, eps);
    drawCirclesAndGroups(inputImage, groups);
    cv::imshow("Detected Circles", inputImage);
    cv::waitKey(0);
}

void processVideo(const string& videoPath, double dp, double minDist, int param1, int param2, int minRadius, int maxRadius, double eps) {
    cv::VideoCapture cap(videoPath);
    if (!cap.isOpened()) {
        cout << "Error: Could not open the video." << endl;
        return;
    }

    cv::Mat frame;
    while (cap.read(frame)) {
        cv::Mat preprocessedImage = preprocessImage(frame);
        vector<cv::Vec3f> circles = detectCircles(preprocessedImage, dp, minDist, param1, param2, minRadius, maxRadius);
        vector<vector<cv::Vec3f>> groups = groupConcentricCircles(circles, eps);
        drawCirclesAndGroups(frame, groups);
        cv::imshow("Detected Circles", frame);
        if (cv::waitKey(30) >= 0) break; // Exit if any key is pressed
    }
}

int main(int argc, char** argv) {
    if (argc != 2 && argc != 9) {
        cout << "Usage: " << argv[0] << " <path_to_image_or_video> [dp minDist param1 param2 minRadius maxRadius eps]" << endl;
        return -1;
    }

    string path = argv[1];
    double dp = 1.0;
    double minDist = 20.0;
    int param1 = 100;
    int param2 = 30;
    int minRadius = 1;
    int maxRadius = 30;
    double eps = 10.0;

    if (argc == 9) {
        dp = stod(argv[2]);
        minDist = stod(argv[3]);
        param1 = stoi(argv[4]);
        param2 = stoi(argv[5]);
        minRadius = stoi(argv[6]);
        maxRadius = stoi(argv[7]);
        eps = stod(argv[8]);
    }

    if (path.find(".mp4") != string::npos || path.find(".avi") != string::npos) {
        processVideo(path, dp, minDist, param1, param2, minRadius, maxRadius, eps);
    } else {
        processImage(path, dp, minDist, param1, param2, minRadius, maxRadius, eps);
    }

    return 0;
}