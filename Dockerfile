# Use the official SQL Server 2022 image on Ubuntu 20.04
FROM mcr.microsoft.com/mssql/server:2022-lts-ubuntu-20.04

# Set environment variables
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=YourStrong!Passw0rd

# Expose default SQL Server port
EXPOSE 1433

# Start SQL Server
CMD ["/opt/mssql/bin/sqlservr"]
