# Maak standaard gebruiker aan
$body = @{
    username='lia123'
    password='lia123'
    role='user'
} | ConvertTo-Json

Write-Host "Creating standard user..."
$response = Invoke-RestMethod -Uri 'http://localhost:3000/api/users' -Method Post -ContentType 'application/json' -Body $body
Write-Host "Response: $response"

# Maak admin gebruiker aan
$body = @{
    username='admin'
    password='liawowadmin'
    role='admin'
} | ConvertTo-Json

Write-Host "Creating admin user..."
$response = Invoke-RestMethod -Uri 'http://localhost:3000/api/users' -Method Post -ContentType 'application/json' -Body $body
Write-Host "Response: $response" 