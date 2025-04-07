# Use the official Microsoft SQL Server 2022 image for Ubuntu
FROM mcr.microsoft.com/mssql/server:2022-lts

# Set environment variables for SA password and EULA acceptance
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=YourStrong!Passw0rd

# Expose the SQL Server port
EXPOSE 1433

# Start SQL Server when the container launches
CMD ["/opt/mssql/bin/sqlservr"]
