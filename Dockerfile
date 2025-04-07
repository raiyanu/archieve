FROM mcr.microsoft.com/mssql/server:2022-latest

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=YourStrong!Passw0rd

# Switch to root user to install packages
USER root

# Install tools (optional)
RUN apt-get update && \
    apt-get install -y curl unzip vim && \
    rm -rf /var/lib/apt/lists/*

# Switch back to default SQL Server user
USER mssql

# Expose SQL Server port
EXPOSE 1433

# Start SQL Server
CMD ["/opt/mssql/bin/sqlservr"]
