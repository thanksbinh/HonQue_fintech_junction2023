# HonQue_fintech_junction2023

JunctionX Hanoi 2023 Hackathon
Chủ đề/Topic: Fintech
Nhóm : HỒN QUÊ
Smart Fintech Assistant - Trợ lý Chuyển tiền

## Giới thiệu:
Fintech là một lĩnh vực công nghệ tài chính đơn giản hóa trải nghiệm tài chính hiện đại và thay đổi thói quen của người tiêu dùng từ truyền thống sang trực tuyến. 
Để tối ưu trải nghiệm, việc sử dụng fintech kết hợp với trí tuệ nhân tạo, học máy và xử lý ngôn ngữ tự nhiên đang trở thành một xu hướng quan trọng.

## Sản phẩm:
Yêu cầu: Thiết kế một sản phẩm fintech giúp khách hàng chuyển tiền một cách dễ dàng và chính xác bằng cách sử dụng bot để tương 
tác với khách hàng thông qua  chat và giọng nói. Ngoài ra sản phẩm fintech này có thể giúp quản lý chi tiêu của một tập thể lớn
Đây là một chat bot hỗ trợ sử dụng và đề xuất thông minh các giao dịch tài chính khi khách hàng có ý định sử dụng. 

Các chức năng chính:
Thực hiện các dịch vụ qua giọng nói hoặc đoạn chat :
Khi khách hàng sử dụng bot để thực hiện các giao dịch nhanh như chuyển tiền, rút tiền, vay vốn, … Họ có thể nói hoặc chat với bot. Khi đó chatbot sẽ đưa ra dịch vụ phù hợp nhất.
Trong các cuộc trò chuyện hoặc gọi điện với người khác. Từ các câu từ khách hàng sử dụng và thói quen theo lịch sử sử dụng dịch vụ của khách hàng, chatbot sẽ đề xuất các dịch vụ phù hợp nhất tự động cho họ. Khi đó nếu khách hàng muốn dùng dịch vụ có thể tùy ý lựa chọn.

Smart group chat :
Như chúng ta đã biết, thủ quỹ là người giữ tiền của 1 nhóm/ lớp/ tổ chức ..., nhưng mà điểm yếu của việc có 1 thủ quỹ là thiếu minh bạch, ngoài 1 vài người ra thì không ai biết trong quỹ có bao nhiêu, đã tiêu vào những việc gì.
Thủ quỹ ảo(chatbot) sẽ làm tốt hơn việc đó, với chức năng chính là quản lý tiền trong quỹ, tạo vote khi có việc cần dùng quỹ, tự động thông báo những người nộp tiền quỹ chậm, … ngoài ra thì thủ quỹ ảo sẽ là một con bot thân thiện với người dùng, giống như một thành viên trong nhóm
 
Những khó khăn phải đối mặt: Đảm bảo tính bảo mật cho khách hàng, đảm bảo tính chính xác và độ tin cậy của thông tin được cung cấp bởi chatbot

Giải pháp cho các khó khăn gặp phải:
Bảo mật thông tin và giao dịch: Để đảm bảo tính bảo mật cho thông tin và giao dịch của khách hàng, ta cần áp dụng các biện pháp bảo mật thông tin như mã hóa dữ liệu, xác thực hai yếu tố và kiểm tra định kỳ. Ta cần phải tuân thủ các quy định bảo mật và chứng nhận an toàn thông tin như PCI DSS, ISO 27001, và SOC 2

Dự đoán chính xác intent của khách hàng :
Tạo tập data training lớn cho bot. Trong tập data này sẽ là các câu text mà khách hàng thường sử dụng khi cần dùng tới dịch vụ tài chính cùng với đó là các label (dịch vụ mà khách hàng sẽ sử dụng ) tương ứng. Sử dụng các model của tensorflow để train dữ liệu giúp bot dự đoán chính xác. 
Ngoài ra bot sẽ lưu lịch sử, ghi nhớ thói quen dùng dịch vụ giao dịch của khách hàng. Từ đó khi gặp các cuộc hội thoại tương tự có thể đưa ra intent chính xác. 

Demo:
<details>
  <summary>Chức năng yêu cầu nộp quỹ</summary>
  <img src="https://user-images.githubusercontent.com/24197774/233515054-d274c01b-3acf-4340-a919-b5c0cecb5ee3.png" width="800">
  <img src="https://user-images.githubusercontent.com/24197774/233515067-245ccab3-f0f3-4812-9d7a-720b94c32e82.png" width="800">
  <img src="https://user-images.githubusercontent.com/24197774/233515220-08839cec-551b-4872-a4b1-77e98cf7e439.png" width="800">
  <img src="https://user-images.githubusercontent.com/24197774/233515096-90ea28d0-16f4-49de-977c-79f36c78b127.png" width="800">
</details>
