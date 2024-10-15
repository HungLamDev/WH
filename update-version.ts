import { readFileSync, writeFileSync, existsSync } from 'fs';

// Lấy ngày hiện tại theo định dạng YYYY.MM.DD
const currentDate = new Date();
const baseVersion = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;

// Kiểm tra nếu file .env đã tồn tại
let version = baseVersion;
let stt = 1;

if (existsSync('.env')) {
  // Đọc file .env nếu có
  const envContent = readFileSync('.env', 'utf8');
  
  // Kiểm tra xem đã có phiên bản trước đó không
  const versionMatch = envContent.match(/VITE_APP_VERSION=(\d{4}\.\d{2}\.\d{2})\.(\d+)/);
  
  if (versionMatch && versionMatch[1] === baseVersion) {
    // Tăng số thứ tự lên nếu ngày hiện tại trùng khớp
    stt = parseInt(versionMatch[2], 10) + 1;
  }
}

// Gán phiên bản với số thứ tự
version = `${baseVersion}.${stt}`;

// Nội dung file .env
const newEnvContent = `VITE_APP_VERSION=${version}\n`;

// Ghi vào file .env
writeFileSync('.env', newEnvContent, 'utf8');

