$envLines = Get-Content -Path ".env.local"
foreach ($line in $envLines) {
    # Skip comments and empty lines
    if ([string]::IsNullOrWhiteSpace($line) -or $line.StartsWith("#")) { continue }
    
    # Check if the line has an equals sign
    if ($line -match "^([^=]+)=(.*)$") {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        
        # Remove surrounding quotes if they exist
        if ($value -match '^"(.*)"$') {
            $value = $matches[1]
        } elseif ($value -match "^'(.*)'$") {
            $value = $matches[1]
        }
        
        Write-Host "Syncing $key into Vercel Production Edge..."
        # Pipe the value directly into the Vercel CLI
        $value | npx vercel env add $key production
    }
}
Write-Host "All credentials synchronized."
